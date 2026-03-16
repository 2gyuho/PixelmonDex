import { NextRequest, NextResponse } from "next/server";

const BLOCKED_PATH_PATTERNS = [
  /^\/\.env(?:\..*)?$/i,
  /^\/\.git(?:\/.*)?$/i,
  /^\/\.aws(?:\/.*)?$/i,
  /^\/wp-config\.php$/i,
  /^\/docker-compose\.ya?ml$/i,
  /^\/config\.json$/i,
  /^\/actuator(?:\/.*)?$/i,
];

function isBlockedPath(pathname: string) {
  return BLOCKED_PATH_PATTERNS.some((pattern) => pattern.test(pathname));
}

export function proxy(request: NextRequest) {
  if (isBlockedPath(request.nextUrl.pathname)) {
    return new NextResponse("Not Found", {
      status: 404,
      headers: {
        "Cache-Control": "public, max-age=300, immutable",
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};