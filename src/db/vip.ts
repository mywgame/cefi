/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { pgTable, uuid, integer, text, numeric, timestamp, index, uniqueIndex } from 'drizzle-orm/pg-core';
import { users } from './users.ts';

// Current active VIP tier and progress tracker
export const vipStatus = pgTable(
  'vip_status',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' })
      .unique(), // Ensure strict 1-to-1 current VIP status per user
    tier: text('tier').default('VIP_0').notNull(), // e.g. VIP_0, VIP_1, VIP_2, VIP_3...
    points: numeric('points', { precision: 20, scale: 8 }).default('0.00000000').notNull(), // Tier qualification points or volume metrics
    assignedAt: timestamp('assigned_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    index('vip_status_user_idx').on(table.userId),
    index('vip_status_tier_idx').on(table.tier),
  ]
);

// Append-only historical log of VIP changes
export const vipHistory = pgTable(
  'vip_history',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id),
    previousTier: text('previous_tier').notNull(),
    newTier: text('new_tier').notNull(),
    reason: text('reason').notNull(), // e.g., "Deposited over $10k", "Admin manual upgrade"
    updatedBy: text('updated_by').default('SYSTEM').notNull(), // Admin UID or SYSTEM
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('vip_history_user_idx').on(table.userId),
    index('vip_history_created_idx').on(table.createdAt),
  ]
);
