import { chromium, Browser, Page } from 'playwright';
import path from 'path';
import os from 'os';
import type { CreateAutomationParams, NavigateParams, ScreenshotParams } from '../types/browser.js';
let browser: Browser | null;
let page: Page | null;
const screenshots = new Map<string, string>();

const defaultDownloadsPath = path.join(os.homedir(), 'Downloads');

export const automationHandlers = {
    async connectBrowserWithWs({ wsUrl }: CreateAutomationParams) {
        try {
            browser = await chromium.connectOverCDP(wsUrl);
            const defaultContext = browser.contexts()[0];
            page = defaultContext.pages()[0];
            browser.on('disconnected', () => {
                console.log('Browser disconnected');
                browser = null;
                page = null;
            });
            return `Browser connected successfully with: ${wsUrl}`;
        } catch (error) {
            return `Failed to connect browser with: ${error?.toString()}`;
        }
    },
    async openNewPage() {
        if (!page) {
            return 'Browser not connected, please connect browser first';
        }
        const newPage = await page.context().newPage();
        page = newPage;
        return `New page opened successfully`;
    },
    async navigate({ url }: NavigateParams) {
        if (!page) {
            return 'Browser not connected, please connect browser first';
        }
        await page.goto(url);
        return `Navigated to ${url} successfully`;
    },
    async screenshot({ savePath, isFullPage }: ScreenshotParams) {
        if (!page) {
            return 'Browser not connected, please connect browser first';
        }
        const filename = `screenshot-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.png`;
        const outputPath = path.join(savePath || defaultDownloadsPath, filename);
        const screenshot = await page.screenshot({ path: outputPath, fullPage: isFullPage });
        const screenshotBase64 = screenshot.toString('base64');
        screenshots.set(filename, screenshotBase64);
        return `Screenshot saved to ${outputPath} successfully`;
    },
    async getPageVisibleText() {
        if (!page) {
            return 'Browser not connected, please connect browser first';
        }
        try {
            const visibleText = await page!.evaluate(() => {
                const walker = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_TEXT,
                    {
                        acceptNode: (node) => {
                            const style = window.getComputedStyle(
                                node.parentElement!
                            );
                            return style.display !== 'none' &&
                                style.visibility !== 'hidden'
                                ? NodeFilter.FILTER_ACCEPT
                                : NodeFilter.FILTER_REJECT;
                        },
                    }
                );
                let text = '';
                let node;
                while ((node = walker.nextNode())) {
                    const trimmedText = node.textContent?.trim();
                    if (trimmedText) {
                        text += trimmedText + '\n';
                    }
                }
                return text.trim();
            });
            return `Visible text content:\n${visibleText}`;
        } catch (error) {
            return `Failed to get visible text content: ${(error as Error).message}`;
        }
    }
}

export const getScreenshot = (filename: string) => {
    return screenshots.get(filename);
}
