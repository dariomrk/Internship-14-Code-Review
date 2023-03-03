import { getCode, getComments } from "./application";
import { renderLine } from "./renderer";

(async () => {
  const codeLines = (await getCode()).split("\n");

  const serverComments = await getComments();

  // TODO load comments from localstorage
  const localComments = null;

  await codeLines.forEach((line, index) => {
    renderLine(index + 1, line, serverComments, localComments);
  });
})();
