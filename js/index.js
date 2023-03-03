import { getCode, getComments, loadLocalComments } from "./application.js";
import { renderLine } from "./renderer.js";

(async () => {
  const codeLines = (await getCode()).split("\n");

  const serverComments = await getComments();

  const localComments = loadLocalComments();

  await codeLines.forEach((line, index) => {
    renderLine(index + 1, line, serverComments, localComments);
  });
})();
