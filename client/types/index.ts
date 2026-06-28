/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Re-export common backend shared types to keep import signatures clean on the frontend
export * from '../../shared/types/index.ts';

// Add any client-only UI types here
export interface UIState {
  isSidebarOpen: boolean;
  activeTab: string;
}
