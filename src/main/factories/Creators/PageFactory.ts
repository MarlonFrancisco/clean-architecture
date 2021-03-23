import { FC } from "react";

export abstract class PageFactory {
  public abstract getPage(page: string): FC;
}
