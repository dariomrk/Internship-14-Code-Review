import { CommentData } from "./application";
import { renderLine } from "./renderer";

renderLine(1, "this is a test line", [new CommentData(1, 1, "Hello", false, "test")]);
