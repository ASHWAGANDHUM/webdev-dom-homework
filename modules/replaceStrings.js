export const replaceStrings = (str) => {
    return str.replaceAll("<","&lt;").replaceAll(">", "&gt;");
}