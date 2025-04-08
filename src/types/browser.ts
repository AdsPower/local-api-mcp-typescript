import { z } from 'zod';
import { schemas } from './schemas.js';

// 从已有的 schema 中导出类型
export type CreateBrowserParams = z.infer<typeof schemas.createBrowserSchema>;
export type UpdateBrowserParams = z.infer<typeof schemas.updateBrowserSchema>;
export type OpenBrowserParams = z.infer<typeof schemas.openBrowserSchema>;
export type CloseBrowserParams = z.infer<typeof schemas.closeBrowserSchema>;
export type DeleteBrowserParams = z.infer<typeof schemas.deleteBrowserSchema>;
export type GetBrowserListParams = z.infer<typeof schemas.getBrowserListSchema>;
export type MoveBrowserParams = z.infer<typeof schemas.moveBrowserSchema>;
export type CreateAutomationParams = z.infer<typeof schemas.createAutomationSchema>;
export type NavigateParams = z.infer<typeof schemas.navigateSchema>;
export type ScreenshotParams = z.infer<typeof schemas.screenshotSchema>;
export type ClickElementParams = z.infer<typeof schemas.clickElementSchema>;
export type FillInputParams = z.infer<typeof schemas.fillInputSchema>;
export type SelectOptionParams = z.infer<typeof schemas.selectOptionSchema>;
export type HoverElementParams = z.infer<typeof schemas.hoverElementSchema>;
export type ScrollElementParams = z.infer<typeof schemas.scrollElementSchema>;
export type PressKeyParams = z.infer<typeof schemas.pressKeySchema>;
export type EvaluateScriptParams = z.infer<typeof schemas.evaluateScriptSchema>;