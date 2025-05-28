import tailwindcss from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';



export default async function Styles({path}: {path: string}) {
    // const css = await Bun.file(path).text();
                
    // const result = await postcss([
    //     tailwindcss,
    //     autoprefixer,
    // ]).process(css, { 
    //     from: path,
    //     to: undefined,
    // });

    // console.log(result.css)

    return (
        <style>
            
        </style>
    )
}