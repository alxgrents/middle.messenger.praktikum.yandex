/**
 * Чтобы TS понимал что делает под капотом "parcel-transformer-hbs"
 */
declare module '*.hbs' {
    const value: (props?: any) => string;
    export default value;
}
