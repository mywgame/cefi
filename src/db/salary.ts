/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { pgTable, uuid, integer, text, numeric, timestamp, index, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users.ts';
import { wallets } from './wallets.ts';

export const salaryHistory = pgTable(
  'salary_history',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    walletId: uuid('wallet_id')
      .notNull()
      .references(() => wallets.id),
    amount: numeric('amount', { precision: 20, scale: 8 }).notNull(), // Amount paid as representative salary
    payPeriodStart: timestamp('pay_period_start').notNull(), // Operational start timestamp for work cycle audit
    payPeriodEnd: timestamp('pay_period_end').notNull(), // Operational end timestamp for work cycle audit
    status: text('status').default('PAID').notNull(), // PAID, PENDING, REJECTED
    transactionId: uuid('transaction_id').notNull(), // Linked ledger transaction UUID
    paidAt: timestamp('paid_at').defaultNow().notNull(), // Actual disbursement instant
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('salary_history_user_idx').on(table.userId),
    index('salary_history_paid_idx').on(table.paidAt),
    check('salary_amount_positive', sql`${table.amount} > 0`),
  ]
);
