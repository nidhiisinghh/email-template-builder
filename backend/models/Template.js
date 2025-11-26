const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  id: String,
  type: String,
  content: String,
  styles: {
    backgroundColor: String,
    padding: String,
    fontSize: String,
    color: String,
    link: String
  }
}, { _id: false });

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  blocks: {
    type: [blockSchema],
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // Fields for template sharing
  sharedWith: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    email: String,
    status: { 
      type: String, 
      enum: ['pending', 'accepted', 'rejected'], 
      default: 'pending' 
    },
    sharedAt: {
      type: Date,
      default: Date.now
    }
  }],
  sharedBy: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    email: String
  },
  shareStatus: {
    type: String,
    enum: ['private', 'shared', 'received'],
    default: 'private'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

templateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Template', templateSchema);