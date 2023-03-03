import { CommentData, getCode, getComments } from "./application";
import { generateLocalComment } from "./generate";
import { renderLine } from "./renderer";

(async () => {
  const codeLines = (await getCode()).split("\n");

  const serverComments = await getComments();

  // TODO load comments from localstorage
  const localComments = [new CommentData(1, 1, "Hello", null, null)];

  await codeLines.forEach((line, index) => {
    renderLine(index + 1, line, serverComments, localComments);
  });
})();
