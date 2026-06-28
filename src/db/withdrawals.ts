/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { pgTable, uuid, integer, text, numeric, timestamp, index, uniqueIndex, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users.ts';
import { wallets } from './wallets.ts';

export const withdrawals = pgTable(
  'withdrawals',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    walletId: uuid('wallet_id')
      .notNull()
      .references(() => wallets.id),
    amount: numeric('amount', { precision: 20, scale: 8 }).notNull(), // Amount to withdraw
    status: text('status').default('PENDING').notNull(), // PENDING, PROCESSING, COMPLETED, FAILED, CANCELLED
    walletAddress: text('wallet_address').notNull(), // Destination address (crypto wallet or bank IBAN)
    network: text('network').notNull(), // Chain/Network (e.g., ERC20, TRC20, ACH)
    reference: text('reference').notNull().unique(), // Unique human-readable trace code (e.g. WD-20260627-XXXX)
    adminApprovalStatus: text('admin_approval_status').default('PENDING').notNull(), // PENDING, APPROVED, REJECTED
    adminNotes: text('admin_notes'), // Auditable explanation for approval or rejection
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('withdrawals_ref_idx').on(table.reference),
    index('withdrawals_user_id_idx').on(table.userId),
    index('withdrawals_status_idx').on(table.status),
    index('withdrawals_created_at_idx').on(table.createdAt),
    check('withdrawal_amount_positive', sql`${table.amount} > 0`),
  ]
);
