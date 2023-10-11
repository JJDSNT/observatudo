import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

if (typeof window !== 'undefined') {
    window.addEventListener('unhandledrejection', (event) => {
        const error = event.reason;
        console.error('Unhandled Promise Rejection:', error);
        // Faça o que for necessário com o erro não tratado, como relatar para um serviço ou realizar alguma ação específica.
    });
} else {
    //process.on('unhandledRejection', (error) => {
    //    console.error('Unhandled Rejection:', error);
    //    throw error; // Você pode escolher lançar o erro para encerrar o processo ou tratá-lo de acordo com seus requisitos.
    //});
    console.log('server middleware');
}

export function middleware(request: NextRequest) {
    console.log('middleware')
    return NextResponse.next()
}

/*
export const config = {
  matcher: '/about/:path*',
}*/