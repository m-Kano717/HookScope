export async function POST(
    request: Request,
    {params}: {params: Promise<{token: string}>}
){
    const body = await request.json();
    const headers = Object.fromEntries(request.headers.entries());
    const {token} = await params;
}