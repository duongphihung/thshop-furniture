import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';

export const config = {
    api: {
        bodyParser: false
    }
};

export async function GET(req) {
    return NextResponse.json({ message: "This Worked", success: true });
}

export async function POST(req) {
    try {
        const data = await req.formData();
        const files = data.getAll('files');
        console.log("Data: ",files);

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: 'No files provided' });
        }

        const savePromises = files.map(async (file, index) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const path = `/tmp/${file.name}`;
            await writeFile(path, buffer);
            console.log(`open ${path} to see the uploaded file`);
        });

        await Promise.all(savePromises);

        return NextResponse.json({ success: true, message: 'Files uploaded successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'An error occurred during file upload' });
    }
}
