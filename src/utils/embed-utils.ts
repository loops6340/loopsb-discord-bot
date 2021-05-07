export class Embed {
    static link(name:string, url:string) {
        return `[${name}](${url})`
    }
}

export function code(content:string, lang?:string) {
    if(!lang) return  `\`\`\`${content}\`\`\``
    else return `\`\`\`${lang}
    ${content}
    \`\`\``
}

