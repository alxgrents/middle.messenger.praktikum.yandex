import BaseBlock from "../common/base-block";

export function createPartialCallback <T extends typeof BaseBlock>(baseBlock: T): (props: any) => any {
    // @ts-ignore т.к. TS ругается на абстрактность класса
    return (props: any) => (new baseBlock(props)).getContent().outerHTML;
}