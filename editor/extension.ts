/// <reference path="../node_modules/pxt-core/built/pxteditor.d.ts" />

namespace pxt.editor {
    initExtensionsAsync = function (opts: pxt.editor.ExtensionOptions): Promise<pxt.editor.ExtensionResult> {
        pxt.debug('loading pxt-brainpad target extensions...')
        const res: pxt.editor.ExtensionResult = {
            /** this requires a rewrite in React. are you sure you need this?
                        showUploadInstructionsAsync: (fn: string, url: string, confirmAsync?: (options: any) => Promise<number>) => {
                            let resolve: (thenableOrResult?: void | PromiseLike<void>) => void;
                            let reject: (error: any) => void;
                            const deferred = new Promise<void>((res, rej) => {
                                resolve = res;
                                reject = rej;
                            });
                            const boardName = pxt.appTarget.appTheme.boardName || "???";
                            const boardDriveName = pxt.appTarget.appTheme.driveDisplayName || pxt.appTarget.compile.driveName || "???";
            
                            // https://msdn.microsoft.com/en-us/library/cc848897.aspx
                            // "For security reasons, data URIs are restricted to downloaded resources. 
                            // Data URIs cannot be used for navigation, for scripting, or to populate frame or iframe elements"
                            const downloadAgain = !pxt.BrowserUtils.isIE() && !pxt.BrowserUtils.isEdge();
                            const docUrl = pxt.appTarget.appTheme.usbDocs;
                            const saveAs = pxt.BrowserUtils.hasSaveAs();
            
                            const htmlBody = `
                            <div class="ui three column grid stackable">
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/connect.png" style="height:182px;width:300px">
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui blue circular label">1</span>
                                                ${lf("Take the USB cable you connected to your computer. Plug it into your Brain Pad.")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/reset.png" style="height:182px;width:300px">
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui blue circular label">2</span>
                                                ${lf("Press A & B buttons for 3 seconds to go into programming mode. The screen will tell you when it's MakeCode READY !!")}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="ui">
                                        <div class="image">
                                            <img class="ui medium rounded image" src="./static/download/transfer.png" style="height:182px;width:300px">
                                        </div>
                                        <div class="content">
                                            <div class="description">
                                                <span class="ui blue circular label">3</span>
                                                ${lf("Select the file and either copy/paste or drag the file to the {0}.", boardDriveName)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
            
                            return confirmAsync({
                                header: lf("Download completed..."),
                                htmlBody,
                                hasCloseIcon: true,
                                hideCancel: true,
                                hideAgree: true,
                                size: 'large',
                                buttons: [downloadAgain ? {
                                    label: fn,
                                    icon: "download",
                                    class: "lightgrey focused",
                                    url,
                                    fileName: fn
                                } : undefined, docUrl ? {
                                    label: lf("Help"),
                                    icon: "help",
                                    class: "lightgrey focused",
                                    url: docUrl
                                } : undefined].filter(b => !!b)
                                //timeout: 20000
                            }).then(() => { });
                        }
            */
        };
        return Promise.resolve<pxt.editor.ExtensionResult>(res);
    }
}