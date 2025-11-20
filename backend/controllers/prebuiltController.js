const prebuiltTemplates = require('../utils/prebuiltTemplates');

exports.getPrebuiltTemplates = async (req, res) => {
  try {
    res.json({
      templates: prebuiltTemplates
    });
  } catch (error) {
    console.error('Error fetching prebuilt templates:', error);
    res.status(500).json({ message: 'Server error fetching prebuilt templates' });
  }
};

exports.getPrebuiltTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const index = parseInt(id);

    if (isNaN(index) || index < 0 || index >= prebuiltTemplates.length) {
      return res.status(404).json({ message: 'Prebuilt template not found' });
    }

    res.json({
      template: prebuiltTemplates[index]
    });
  } catch (error) {
    console.error('Error fetching prebuilt template:', error);
    res.status(500).json({ message: 'Server error fetching prebuilt template' });
  }
};