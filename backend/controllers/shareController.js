const Template = require('../models/Template');
const User = require('../models/User');

// Share a template with another user
exports.shareTemplate = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { recipientEmail } = req.body;
    const sharerId = req.user._id;
    const sharerEmail = req.user.email;

    // Validate input
    if (!recipientEmail) {
      return res.status(400).json({ message: 'Recipient email is required' });
    }

    // Check if template exists and belongs to the user
    const template = await Template.findOne({ _id: templateId, userId: sharerId });
    if (!template) {
      return res.status(404).json({ message: 'Template not found or unauthorized' });
    }

    // Check if trying to share with themselves
    if (recipientEmail === sharerEmail) {
      return res.status(400).json({ message: 'Cannot share template with yourself' });
    }

    // Check if recipient exists
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient user not found' });
    }

    // Check if already shared with this user
    const existingShare = template.sharedWith.find(
      share => share.userId.toString() === recipient._id.toString()
    );

    if (existingShare) {
      if (existingShare.status === 'accepted') {
        return res.status(400).json({ message: 'Template already shared with this user' });
      } else if (existingShare.status === 'pending') {
        return res.status(400).json({ message: 'Template sharing invitation already sent' });
      }
    }

    // Update template with shared information
    template.sharedWith.push({
      userId: recipient._id,
      email: recipientEmail,
      status: 'pending'
    });

    // Set share status to shared if not already set
    if (template.shareStatus === 'private') {
      template.shareStatus = 'shared';
    }

    await template.save();

    res.status(200).json({
      message: 'Template shared successfully',
      template
    });
  } catch (error) {
    console.error('Error sharing template:', error);
    res.status(500).json({ message: 'Server error sharing template' });
  }
};

// Get templates shared with the current user
exports.getSharedTemplates = async (req, res) => {
  try {
    const userId = req.user._id;
    const userEmail = req.user.email;

    // Find templates where the user is in sharedWith array with accepted status
    const sharedTemplates = await Template.find({
      'sharedWith.userId': userId,
      'sharedWith.status': 'accepted'
    }).populate('userId', 'username email');

    // Also find templates where the user is the sharer
    const templatesSharedByUser = await Template.find({
      userId: userId,
      shareStatus: 'shared'
    }).populate({
      path: 'sharedWith.userId',
      select: 'username email'
    });

    res.json({
      sharedWithMe: sharedTemplates,
      sharedByMe: templatesSharedByUser
    });
  } catch (error) {
    console.error('Error fetching shared templates:', error);
    res.status(500).json({ message: 'Server error fetching shared templates' });
  }
};

// Accept or reject a shared template
exports.respondToShare = async (req, res) => {
  try {
    const { templateId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'
    const userId = req.user._id;

    if (!action || (action !== 'accept' && action !== 'reject')) {
      return res.status(400).json({ message: 'Action must be either "accept" or "reject"' });
    }

    // Find the template where the user is in sharedWith array
    const template = await Template.findOne({
      _id: templateId,
      'sharedWith.userId': userId
    });

    if (!template) {
      return res.status(404).json({ message: 'Shared template not found' });
    }

    // Update the status in sharedWith array
    const shareIndex = template.sharedWith.findIndex(
      share => share.userId.toString() === userId.toString()
    );

    if (shareIndex === -1) {
      return res.status(404).json({ message: 'Share request not found' });
    }

    template.sharedWith[shareIndex].status = action === 'accept' ? 'accepted' : 'rejected';

    // If accepting, create a copy for the user
    if (action === 'accept') {
      const userCopy = new Template({
        name: `${template.name} (Shared)`,
        blocks: template.blocks,
        userId: userId,
        sharedBy: {
          userId: template.userId,
          email: template.userId.email || template.userId // Fallback to userId if email is not available
        },
        shareStatus: 'received'
      });

      await userCopy.save();
    }

    await template.save();

    res.json({
      message: `Template ${action}ed successfully`,
      template
    });
  } catch (error) {
    console.error('Error responding to share:', error);
    res.status(500).json({ message: 'Server error responding to share' });
  }
};

// Get pending share requests for the current user
exports.getPendingShares = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find templates where the user has pending share requests
    const pendingTemplates = await Template.find({
      'sharedWith.userId': userId,
      'sharedWith.status': 'pending'
    }).populate('userId', 'username email');

    res.json({
      pendingShares: pendingTemplates
    });
  } catch (error) {
    console.error('Error fetching pending shares:', error);
    res.status(500).json({ message: 'Server error fetching pending shares' });
  }
};