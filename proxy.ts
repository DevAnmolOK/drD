import { NextResponse, type NextRequest } from "next/server";
// import { RedirectionData } from "./lib/api/endpoints";
// import { fetchData } from "./utils/fetchData";

const checkMethods: any = {
    Exact: "exact",
    Contains: "contains",
    "Starts With": "startsWith",
    "End With": "endsWith",
    Regex: "regex",
};

export async function proxy(request: NextRequest) {
    // Create headers object with x-pathname for breadcrumb schema
    const headers = new Headers(request.headers);
    headers.set("x-pathname", request.nextUrl.pathname);

    //   const setting = await fetchData("setting", {
    //     cacheStrategy: "no-store",
    //     cache: "no-store",
    //   });

    // Debug logging for settings
    const path = request.nextUrl.pathname.toLowerCase();

    //------------------------------------- Handle maintenance mode redirection---------------------------------
    //   if (setting?.data?.is_maintenance_mode) {
    //     // If in maintenance mode and not already on maintenance page, redirect
    //     if (path !== "/maintenance") {
    //       const targetUrl = new URL("/maintenance", request.nextUrl.origin);
    //       return NextResponse.redirect(targetUrl);
    //     }
    //   } else {
    //     // If NOT in maintenance mode but on maintenance page, redirect home
    //     if (path === "/maintenance") {
    //       const targetUrl = new URL("/", request.nextUrl.origin);
    //       return NextResponse.redirect(targetUrl);
    //     }
    //   }

    // --------------------------------------------Handle restricted root routes---------------------------------

    // const restrictedRoots = ["/theme", "/category", "/case-studies", "/author"];

    // if (
    //     restrictedRoots.includes(path) ||
    //     restrictedRoots.includes(path.replace(/\/$/, ""))
    // ) {
    //     const targetUrl = new URL("/", request.nextUrl.origin);
    //     return NextResponse.redirect(targetUrl);
    // }

    // --------------------------------------------Handle redirects----------------------------------------------
    // function normalize(url: string) {
    //     return url !== "/" ? url.replace(/\/$/, "") : url;
    // }

    // let redirects = await RedirectionData.getRedirection();

    // if (redirects?.data?.length > 0) {
    //     const newPath = redirects.data.find((item: any) => {
    //         const method = checkMethods[item.source.check];
    //         const sourceUrl = normalize(item.source.url);
    //         const currentPath = request.nextUrl.pathname;

    //         switch (method) {
    //             case "exact":
    //                 return currentPath === sourceUrl;
    //             case "contains":
    //                 return currentPath.includes(sourceUrl);
    //             case "startsWith":
    //                 return currentPath.startsWith(sourceUrl);
    //             case "endsWith":
    //                 return currentPath.endsWith(sourceUrl);
    //             case "regex":
    //                 try {
    //                     const regex = new RegExp(sourceUrl);
    //                     return regex.test(currentPath);
    //                 } catch (e) {
    //                     console.error("Invalid regex pattern:", sourceUrl);
    //                     return false;
    //                 }
    //             default:
    //                 return false;
    //         }
    //     });


    //     if (newPath) {
    //         const statusCodeStr = newPath.status_code?.split("_")?.[1] || "301";

    //         let statusCode = parseInt(statusCodeStr, 10);

    //         if (isNaN(statusCode)) statusCode = 301;

    //         if (statusCode === 410) {
    //             return new NextResponse(
    //                 `<!DOCTYPE html>
    //         <html>
    //           <head>
    //             <title>410 Gone</title>
    //             <meta name="viewport" content="width=device-width, initial-scale=1">
    //             <style>
    //               body { font-family: Open Sans; text-align: center; padding: 50px; }
    //               h1 { font-size: 50px; }
    //               body { font: 20px Helvetica, Open Sans; color: #333; }
    //               article { display: block; text-align: left; max-width: 650px; margin: 0 auto; }
    //               a { color: #dc8100; text-decoration: none; }
    //               a:hover { color: #333; text-decoration: none; }
    //             </style>
    //           </head>
    //           <body>
    //             <article>
    //               <h1>410 Gone</h1>
    //               <p>The resource you requested is no longer available on this website.</p>
    //               <a href="/">Return to the homepage</a>
    //             </article>
    //           </body>
    //         </html>`,
    //                 {
    //                     status: 410,
    //                     statusText: "Gone",
    //                     headers: {
    //                         "Content-Type": "text/html",
    //                         "x-url": path,
    //                         "x-status": statusCode.toString(),
    //                     },
    //                 },
    //             );
    //         }
    //         if (newPath?.target_path) {
    //             // Create a new response with the redirect
    //             const targetUrl = new URL(newPath.target_path, request.nextUrl.origin);

    //             // Workaround for custom status code
    //             const response = new NextResponse(null, {
    //                 status: statusCode,
    //                 headers: {
    //                     Location: targetUrl.toString(),
    //                     "x-url": path,
    //                     "x-status": statusCode.toString(),
    //                 },
    //             });

    //             return response;
    //         }
    //     }
    // }

    // ------------------------------ CORS & Default Response -------------------------------

    // Set the x-url header with the current pathname
    headers.set("x-url", path);

    // Create a response with the modified headers
    const response = NextResponse.next({
        request: {
            headers: headers,
        },
    });

    if (request.nextUrl.pathname.startsWith("/api")) {
        const allowedOrigins = [process.env.NEXT_PUBLIC_SERVER_URL];
        const origin =
            request.headers.get("origin") || process.env.NEXT_PUBLIC_SERVER_URL;

        if (origin && allowedOrigins.includes(origin)) {
            response.headers.set("Access-Control-Allow-Origin", origin);
            response.headers.set("Access-Control-Allow-Credentials", "true");
            response.headers.set(
                "Access-Control-Allow-Methods",
                "GET, POST, PUT, DELETE, OPTIONS",
            );
            response.headers.set(
                "Access-Control-Allow-Headers",
                "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
            );
            response.headers.set("Access-Control-Expose-Headers", "x-url");
        }

        if (request.method === "OPTIONS") {
            return new NextResponse(null, {
                status: 204,
                headers: {
                    ...Object.fromEntries(response.headers),
                    "Access-Control-Max-Age": "86400",
                },
            });
        }
    }
    return response;
}

// Updated matcher to include all routes except static files
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
