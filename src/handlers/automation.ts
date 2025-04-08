import { chromium, Browser, Page } from 'playwright';
import path from 'path';
import os from 'os';
import type { CreateAutomationParams, NavigateParams, ScreenshotParams, ClickElementParams, FillInputParams, SelectOptionParams, HoverElementParams, ScrollElementParams, PressKeyParams, EvaluateScriptParams } from '../types/browser.js';
let browser: Browser | null;
let page: Page | null;
const screenshots = new Map<string, string>();

const defaultDownloadsPath = path.join(os.homedir(), 'Downloads');

const checkPageConnected = () => {
    const error = new Error('Browser not connected, please connect browser first');
    if (!browser) {
        throw error;
    }
    if (!browser.isConnected()) {
        throw error;
    }
    if (!page) {
        throw error;
    }
}

export const automationHandlers = {
    async connectBrowserWithWs({ wsUrl }: CreateAutomationParams) {
        try {
            browser = await chromium.connectOverCDP(wsUrl);
            const defaultContext = browser.contexts()[0];
            page = defaultContext.pages()[0];
            // browser.on('disconnected', () => {
            //     console.log('Browser disconnected');
            //     browser = null;
            //     page = null;
            // });
            return `Browser connected successfully with: ${wsUrl}`;
        } catch (error) {
            return `Failed to connect browser with: ${error?.toString()}`;
        }
    },
    async openNewPage() {
        checkPageConnected();
        const newPage = await page!.context().newPage();
        page = newPage;
        return `New page opened successfully`;
    },
    async navigate({ url }: NavigateParams) {
        checkPageConnected();
        await page!.goto(url);
        return `Navigated to ${url} successfully`;
    },
    async screenshot({ savePath, isFullPage }: ScreenshotParams) {
        checkPageConnected();
        const filename = `screenshot-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.png`;
        const outputPath = path.join(savePath || defaultDownloadsPath, filename);
        const screenshot = await page!.screenshot({ path: outputPath, fullPage: isFullPage });
        const screenshotBase64 = screenshot.toString('base64');
        screenshots.set(filename, screenshotBase64);
        return [{
            type: 'image' as const,
            data: screenshotBase64,
            mimeType: 'image/png'
        }];
    },
    async getPageVisibleText() {
        checkPageConnected();
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
    },
    async getPageHtml() {
        checkPageConnected();
        const html = await page!.content();
        return html;
    },
    async clickElement({ selector }: ClickElementParams) {
        checkPageConnected();
        await page!.click(selector);
        return `Clicked element with selector: ${selector} successfully`;
    },
    async fillInput({ selector, text }: FillInputParams) {
        checkPageConnected();
        await page!.waitForSelector(selector);
        await page!.fill(selector, text);
        return `Filled input with selector: ${selector} with text: ${text} successfully`;
    },
    async selectOption({ selector, value }: SelectOptionParams) {
        checkPageConnected();
        await page!.waitForSelector(selector);
        await page!.selectOption(selector, value);
        return `Selected option with selector: ${selector} with value: ${value} successfully`;
    },
    async hoverElement({ selector }: HoverElementParams) {
        checkPageConnected();
        await page!.waitForSelector(selector);
        await page!.hover(selector);
        return `Hovered element with selector: ${selector} successfully`;
    },
    async scrollElement({ selector }: ScrollElementParams) {
        checkPageConnected();
        await page!.waitForSelector(selector);
        await page!.evaluate((selector) => {
            const element = document.querySelector(selector);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, selector);
        return `Scrolled element with selector: ${selector} successfully`;
    },
    async pressKey({ key, selector }: PressKeyParams) {
        checkPageConnected();
        if (selector) {
            await page!.waitForSelector(selector);
            await page!.focus(selector);
        }
        await page!.keyboard.press(key);
        return `Pressed key: ${key} successfully`;
    },
    async evaluateScript({ script }: EvaluateScriptParams) {
        checkPageConnected();
        const result = await page!.evaluate(script);
        return result;
    }
}

export const getScreenshot = (filename: string) => {
    return screenshots.get(filename);
}
