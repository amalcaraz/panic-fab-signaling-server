export interface ClientLoginData {
  alias: string;
}

export class ClientData {
  constructor(public socketId: string,
              public alias: string,
              public rooms: string[]) {
  }
}

export class ClientDataStore {

  private clientList: { [socketId: string]: ClientData } = {};

  getClientsDataListFromSocketMap(sockets: { [id: string]: SocketIO.Socket }): ClientData[] {
    return Object
      .keys(sockets)
      .map((k: string) => sockets[k])
      .reduce((prev: ClientData[], curr: SocketIO.Socket) => {
        const clientData: ClientData | undefined = this.get(curr.id);
        return clientData
          ? prev.concat(clientData)
          : prev;
      }, []);
  }

  get(id: string): ClientData | undefined {

    return this.clientList[id];

  }

  set(id: string, data: ClientData): void {

    this.clientList[id] = data;

  }

  remove(id: string): void {

    delete this.clientList[id];

  }

  getByAlias(alias: string): ClientData | undefined {

    return this.findByProperty('alias', alias);

  }

  setByAlias(alias: string, data: ClientData): void {

    const i: string | undefined = this.findIndexByProperty('alias', alias);
    if (i) this.clientList[i] = data;

  }

  private findIndexByProperty(prop: keyof ClientData, value: any): string | undefined {
    return Object.keys(this.clientList).find((key: string) => this.clientList[key][prop] === value);
  }

  private findByProperty(prop: keyof ClientData, value: any): ClientData | undefined {
    const i: string | undefined = this.findIndexByProperty(prop, value);
    return i ? this.clientList[i] : undefined;
  }

}