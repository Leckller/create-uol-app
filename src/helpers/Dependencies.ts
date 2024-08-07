import fs from "fs/promises";
import { dependencies } from "../interfaces";

// Acabei não usando isso agora, mas devo mudar a lógica para utilizar esse aqui mesmo
export default class Dependencies {
  public async readFile(
    packagePath: string
  ): Promise<dependencies.PackageBase> {
    const data = await fs.readFile(packagePath);
    const json = await JSON.parse(data.toString());
    return json;
  }

  public async addDependency(
    isDevDep: boolean,
    newDep: dependencies.dependencies,
    pathFile: string
  ): Promise<any> {
    const data = await this.readFile(pathFile);
    if (isDevDep) {
      data.devDependencies = {
        ...data.devDependencies,
        ...newDep
      }
    } else {
      data.dependencies = {
        ...data.dependencies,
        ...newDep
      }
    }
    await fs.writeFile(pathFile, JSON.stringify(data));
    return data;
  }

  public async setScripts(clearScripts: boolean, scripts: object, pathFile: string) {
    const data = await this.readFile(pathFile);
    if (clearScripts) {
      data.scripts = {
        ...scripts
      }
    } else {
      data.scripts = {
        ...data.scripts,
        ...scripts
      }
    }
    await fs.writeFile(pathFile, JSON.stringify(data));
    return data;
  }
}