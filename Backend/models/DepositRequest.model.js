const mongoose = require('mongoose');

/**
 * Deposit Request Model
 *
 * Notes:
 * - This schema is used by both user-facing `/api/payment/*` endpoints and admin
 *   deposit pool endpoints (`/api/admin/deposit-pool/*`).
 * - The codebase historically used uppercase statuses (PENDING/APPROVED/CANCELLED).
 *   We now standardize on lowercase (pending/approved/cancelled) but keep backwards
 *   compatibility so old records dont break.
 */

const depositRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // What deposit method user used
    paymentMethod: {
      type: String,
      default: 'iban',
      trim: true,
    },

    // Proof / reference info (optional)
    transactionReference: {
      type: String,
      default: null,
      trim: true,
    },
    slipImage: {
      type: String,
      default: null,
      trim: true,
    },

    description: {
      type: String,
      default: null,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        'pending',              // Initial request by user
        'waiting_for_payment',  // Admin sent bank details to user
        'payment_submitted',    // User uploaded proof screenshot
        'approved',             // Admin confirmed payment and added balance
        'cancelled',            // Request rejected or cancelled
        // legacy
        'PENDING',
        'APPROVED',
        'CANCELLED',
      ],
      default: 'pending',
    },

    // For manual bank transfer flow
    bankName: { type: String, default: null },
    iban: { type: String, default: null },
    accountHolder: { type: String, default: null },
    screenshot: { type: String, default: null }, // Link to proof image

    // Admin workflow metadata
    adjustedAmount: {
      type: Number,
      default: null,
      min: 0,
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    cancelledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    cancelledAt: {
      type: Date,
      default: null,
    },
    adminNotes: {
      type: String,
      default: null,
      trim: true,
    },

    // For compatibility with older code that referenced `type`
    type: {
      type: String,
      default: 'IBAN',
      trim: true,
    },

    // For compatibility with older code that stored details in an object
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  { timestamps: true }
);

// Normalize legacy statuses to lowercase
depositRequestSchema.pre('save', function (next) {
  if (typeof this.status === 'string') {
    const s = this.status.toLowerCase();
    if (['pending', 'approved', 'cancelled'].includes(s)) {
      this.status = s;
    }
  }
  next();
});

// Indexes for pool lookups
depositRequestSchema.index({ status: 1, createdAt: -1 });
depositRequestSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Deposit', depositRequestSchema);
