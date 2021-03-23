import { FC } from "react";

import { PageFactory } from "@/main/factories/Creators";

import { Login } from "@/presentation/pages";

export class ConcretePageFactory extends PageFactory {
  public getPage(page: string): FC {
    switch (page) {
      case "Login":
        return Login;
      default:
        throw new Error(`Page ${page} cannot be created`);
    }
  }
}
