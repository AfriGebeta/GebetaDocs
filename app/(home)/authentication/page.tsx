/* eslint-disable  */
// @ts-nocheck
"use client";

export default function ApiDocs() {


    const CodeBlock = ({ code, language = "bash", title }) => (
        <div className="my-6 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-900">
            {title && (
                <div className="flex items-center justify-between px-4 py-2 bg-stone-800 border-b border-stone-700">
                    <span className="text-xs font-medium text-stone-300">{title}</span>
                    <span className="text-xs text-stone-500 uppercase">{language}</span>
                </div>
            )}
            <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
                <code className="font-mono text-stone-100 whitespace-pre">
                    {code}
                </code>
            </pre>
        </div>
    );

    const InlineCode = ({ children }) => (
        <code className="px-1.5 py-0.5 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded text-sm font-mono border border-stone-200 dark:border-stone-700">
            {children}
        </code>
    );

    const SectionHeading = ({ children, id }) => (
        <h2
            id={id}
            className="text-2xl tracking-tighter font-normal mt-12 mb-4 pb-2 border-b border-stone-200 dark:border-stone-700 text-stone-800 dark:text-white scroll-mt-24"
        >
            {children}
        </h2>
    );

    const SubHeading = ({ children }) => (
        <h3 className="text-lg tracking-tight font-normal mt-6 mb-3 text-stone-800 dark:text-white">
            {children}
        </h3>
    );

    const Badge = ({ children, variant = "default" }) => {
        const variants = {
            post: "bg-emerald-500 text-white",
            get: "bg-sky-600 text-white",
            put: "bg-amber-500 text-white",
            delete: "bg-rose-500 text-white",
            success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300",
            error: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300",
            default: "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300",
        };
        return (
            <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded ${variants[variant] || variants.default}`}>
                {children}
            </span>
        );
    };

    const Note = ({ children, variant = "info" }) => {
        const variants = {
            warning: "bg-amber-50 dark:bg-amber-900/20 border-amber-400 text-stone-800 dark:text-stone-200",
            info: "bg-sky-50 dark:bg-sky-900/20 border-sky-400 text-stone-800 dark:text-stone-200",
            danger: "bg-rose-50 dark:bg-rose-900/20 border-rose-400 text-stone-800 dark:text-stone-200",
        };
        return (
            <div className={`mt-4 p-4 border-l-4 rounded-r-lg ${variants[variant]}`}>
                <p className="text-sm">{children}</p>
            </div>
        );
    };

    const DataTable = ({ headers, rows }) => (
        <div className="overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-700">
            <table className="w-full text-sm">
                <thead className="bg-stone-100 dark:bg-stone-800">
                <tr>
                    {headers.map((header, i) => (
                        <th key={i} className="border-b border-stone-200 dark:border-stone-700 px-4 py-3 text-left font-medium text-stone-700 dark:text-stone-300">
                            {header}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-700">
                {rows.map((row, i) => (
                    <tr key={i} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition">
                        {row.map((cell, j) => (
                            <td key={j} className="px-4 py-3 text-stone-600 dark:text-stone-400">
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="min-h-screen bg-white dark:bg-stone-950 text-stone-800 dark:text-stone-200 font-sans antialiased">


            <main className="lg:ml-72 max-w-4xl mx-auto px-4 py-16 lg:px-8">
                <h1 className="text-4xl tracking-tighter md:text-5xl font-normal mb-4 text-stone-800 dark:text-white">
                    Service Accounts API
                </h1>
                <p className="text-stone-600 dark:text-stone-400 mb-12 max-w-2xl">
                    Manage service accounts for server-to-server authentication with the Gebeta Maps API.
                </p>

                {/* Introduction */}
                <section id="introduction" className="mb-12 scroll-mt-24">
                    <SectionHeading id="introduction">Introduction</SectionHeading>

                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        Service Accounts provide a secure way to authenticate with the Gebeta Maps API without exposing a single long-term token that could be leaked or misused.
                    </p>

                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        Instead of relying on one permanent credential, Service Accounts use two tokens:
                        a <span className="font-medium">Client Token</span> and a{" "}
                        <span className="font-medium">Server Token</span>.
                        These tokens work together to securely generate a short-lived JWT access token.
                    </p>

                    <p className="text-stone-600 dark:text-stone-400">
                        The generated access token can then be used to securely access Gebeta Maps APIs and services.
                        Service Accounts are ideal for backend integrations, server-to-server communication,
                        automation workflows, and CI/CD pipelines.
                    </p>
                </section>



                {/* Base URL */}
                <section id="base-url" className="mb-12 scroll-mt-24">
                    <SectionHeading id="base-url">Base URL</SectionHeading>
                    <CodeBlock code="https://mapapi.gebeta.app/api/v1/service-accounts" language="url" />
                </section>

                {/* Authentication */}
                <section id="authentication" className="mb-12 scroll-mt-24">
                    <SectionHeading id="authentication">Authentication</SectionHeading>
                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        All Service Account management endpoints require a valid user authentication token passed in the{" "}
                        <InlineCode>Authorization</InlineCode> header:
                    </p>
                    <CodeBlock code="Authorization: Bearer &lt;user_token&gt;" language="http" />
                </section>

                {/* Platform Types */}
                <section id="platform-types" className="mb-12 scroll-mt-24">
                    <SectionHeading id="platform-types">Platform Types</SectionHeading>
                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        Service Accounts are associated with a platform. The following platform types are supported:
                    </p>
                    <DataTable
                        headers={["Value", "Description"]}
                        rows={[
                            [<InlineCode>WEB</InlineCode>, "Web applications"],
                            [<InlineCode>ANDROID</InlineCode>, "Android applications"],
                            [<InlineCode>IOS</InlineCode>, "iOS applications"],
                            [<InlineCode>DESKTOP</InlineCode>, "Desktop applications"],
                        ]}
                    />
                </section>

                {/* Statuses */}
                <section id="statuses" className="mb-12 scroll-mt-24">
                    <SectionHeading id="statuses">Service Account Status</SectionHeading>
                    <DataTable
                        headers={["Value", "Description"]}
                        rows={[
                            [<InlineCode>ACTIVE</InlineCode>, "The service account is active and its token can be used"],
                            [<InlineCode>SUSPENDED</InlineCode>, "The service account is temporarily suspended"],
                            [<InlineCode>REVOKED</InlineCode>, "The service account has been permanently revoked"],
                        ]}
                    />
                </section>

                {/* Create Endpoint */}
                <section id="create" className="mb-12 scroll-mt-24">
                    <SectionHeading id="create">
                        Create a Service Account
                    </SectionHeading>

                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        To use Service Accounts, go to your Gebeta Maps dashboard and create two accounts:
                        one for your client application and another for your backend server.
                    </p>

                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        Gebeta Maps generates a <span className="font-medium">Client Token</span> for your client application
                        and a <span className="font-medium">Server Token</span> for your backend.
                        These two credentials work together to securely generate short-lived access tokens for API requests.
                    </p>

                    <p className="text-stone-600 dark:text-stone-400">
                        This approach improves security by avoiding the use of a single long-term token
                        and helps protect your Gebeta Maps APIs from exposed credentials.
                    </p>

                    <SubHeading>Configuration</SubHeading>

                    <DataTable
                        headers={["Field", "Type", "Description"]}
                        rows={[
                            [<InlineCode>platform</InlineCode>, "string", "One of: WEB, ANDROID, IOS, DESKTOP"],
                            [<InlineCode>isAdmin</InlineCode>, "boolean", "Whether the account has admin privileges"],
                            [<InlineCode>description</InlineCode>, "string", "A human-readable description of the service account"],
                            [<InlineCode>scopes</InlineCode>, "string[]", "Permissions assigned to the service account"],
                        ]}
                    />

                    {/* Scopes */}
                    <section id="scopes" className="mb-12 scroll-mt-24">
                        <SectionHeading id="scopes">Available Token Scopes</SectionHeading>
                        <DataTable
                            headers={["Scope", "Description"]}
                            rows={[
                                [<InlineCode>TILE</InlineCode>, "Access to tile/map rendering services"],
                                [<InlineCode>MATRIX</InlineCode>, "Access to distance matrix services"],
                                [<InlineCode>ONM</InlineCode>, "Access to ONM services"],
                                [<InlineCode>DIRECTION</InlineCode>, "Access to routing/direction services"],
                                [<InlineCode>TSS</InlineCode>, "Access to route optimization services"],
                                [<InlineCode>GEOCODING</InlineCode>, "Access to geocoding/autocomplete services"],
                                [<InlineCode>REVERSEGEOCODING</InlineCode>, "Access to reverse geocoding services"],
                            ]}
                        />
                    </section>


                    <Note variant="warning">
                        <strong>Important:</strong> Store your Server Token securely and never expose it in client-side applications.
                        It should only be used from your backend server.
                    </Note>
                </section>


                {/* Authentication Flow */}
                <section id="using-token" className="mb-12 scroll-mt-24">
                    <SectionHeading id="using-token">
                        Authenticating with Service Accounts
                    </SectionHeading>

                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        Service Account authentication works by combining your
                        <span className="font-medium"> Client Token</span> and
                        <span className="font-medium"> Server Token</span>.
                        Once both credentials are verified, Gebeta Maps generates a short-lived
                        access token and a refresh token.
                    </p>

                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        The access token is used to authenticate API requests across all Gebeta Maps services.
                        Since the access token is temporary, it must be refreshed periodically using the refresh token.
                    </p>

                    <SubHeading>Generate Access Token</SubHeading>

                    <CodeBlock
                        language="bash"
                        code={`curl --location --request POST 'https://mapapi.gebeta.app/api/v1/external/auth' \\
--header 'Content-Type: application/json' \\
--data-raw '{
  "client_token": "<client_token>",
  "server_token": "<server_token>"
}'`}
                    />

                    <SubHeading>Example Response</SubHeading>

                    <CodeBlock
                        language="json"
                        code={`{
  "data": {
    "accessToken": "<access_token>",
    "refreshToken": "<refresh_token>"
  }
}`}
                    />

                    <SubHeading>Using the Access Token</SubHeading>

                    <CodeBlock
                        language="bash"
                        code={`curl -X GET https://mapapi.gebeta.app/api/v1/route?origin=...&destination=... \\
-H "Authorization: Bearer <access_token>"`}
                    />

                    <SubHeading>Refresh Access Token</SubHeading>

                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        Access tokens expire after a short period of time. Use the refresh token
                        to generate a new access token when needed.
                    </p>

                    <CodeBlock
                        language="json"
                        code={`{
  "refresh_token": "<refresh_token>"
}`}
                    />

                    <Note variant="warning">
                        <strong>Important:</strong> Never expose your Server Token or Refresh Token in client-side applications.
                        They should only be stored and used securely on your backend server.
                    </Note>
                </section>



                {/* Errors */}
                <section id="errors" className="mb-12 scroll-mt-24">
                    <SectionHeading id="errors">Error Responses</SectionHeading>

                    <SubHeading>Validation Error</SubHeading>
                    <p className="text-stone-600 dark:text-stone-400 mb-2">Returned when the request body or parameters are invalid.</p>
                    <CodeBlock
                        language="json"
                        code={`{
  "error": "Validation failed",
  "code": "FAILED_VALIDATION"
}`}
                    />
                    <p className="mt-2"><Badge variant="error">400 Bad Request</Badge></p>

                    <SubHeading>Unauthorized</SubHeading>
                    <p className="text-stone-600 dark:text-stone-400 mb-2">Returned when the authentication token is missing or invalid.</p>
                    <CodeBlock
                        language="json"
                        code={`{
  "error": "invalid or missing api key"
}`}
                    />
                    <p className="mt-2"><Badge variant="error">401 Unauthorized</Badge></p>

                    <SubHeading>Not Found</SubHeading>
                    <p className="text-stone-600 dark:text-stone-400 mb-2">Returned when the requested service account does not exist.</p>
                    <p><Badge variant="error">404 Not Found</Badge></p>

                    <SubHeading>Internal Server Error</SubHeading>
                    <p className="text-stone-600 dark:text-stone-400 mb-2">Returned when an unexpected server error occurs.</p>
                    <CodeBlock
                        language="json"
                        code={`{
  "error": "Internal server error"
}`}
                    />
                    <p className="mt-2"><Badge variant="error">500 Internal Server Error</Badge></p>
                </section>

                {/* Best Practices */}
                <section id="best-practices" className="mb-12 scroll-mt-24">
                    <SectionHeading id="best-practices">Best Practices</SectionHeading>
                    <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 space-y-2 ml-2">
                        <li><strong className="text-stone-800 dark:text-stone-200">Store tokens securely</strong> — Treat service account tokens like passwords. Never expose them in client-side code, public repositories, or logs.</li>
                        <li><strong className="text-stone-800 dark:text-stone-200">Use the minimum required scopes</strong> — Only request the scopes your application needs. This limits the blast radius if a token is compromised.</li>
                        <li><strong className="text-stone-800 dark:text-stone-200">Rotate tokens regularly</strong> — Delete old service accounts and create new ones periodically to reduce the risk of token leakage.</li>
                        <li><strong className="text-stone-800 dark:text-stone-200">Use descriptions</strong> — Add meaningful descriptions to your service accounts so you can easily identify which application or service each one belongs to.</li>
                        <li><strong className="text-stone-800 dark:text-stone-200">Suspend instead of delete</strong> — If you temporarily don't need a service account, update its status to <InlineCode>SUSPENDED</InlineCode> rather than deleting it. This preserves the account for future use.</li>
                        <li><strong className="text-stone-800 dark:text-stone-200">Monitor usage</strong> — Use the organization list endpoint to regularly audit which service accounts exist and whether they are still needed.</li>
                        <li><strong className="text-stone-800 dark:text-stone-200">Separate environments</strong> — Create different service accounts for development, staging, and production environments.</li>
                    </ul>
                </section>

                {/* Quick Start */}
                <section id="quickstart" className="mb-12 scroll-mt-24">
                    <SectionHeading id="quickstart">Quick Start Example</SectionHeading>

                    <p className="text-stone-600 dark:text-stone-400 mb-4">
                        This example shows how to authenticate using a Service Account by combining
                        a <span className="font-medium">Client Token</span> and a{" "}
                        <span className="font-medium">Server Token</span>, then using the generated
                        access token to call Gebeta Maps APIs.
                    </p>

                    <CodeBlock
                        language="python"
                        code={`import requests

BASE_URL = "https://mapapi.gebeta.app/api/v1"

CLIENT_TOKEN = "your_client_token"
SERVER_TOKEN = "your_server_token"

# 1. Exchange service account credentials for access tokens
auth_response = requests.post(
    f"{BASE_URL}/external/auth",
    json={
        "client_token": CLIENT_TOKEN,
        "server_token": SERVER_TOKEN
    }
)

auth_data = auth_response.json()["data"]

access_token = auth_data["accessToken"]
refresh_token = auth_data["refreshToken"]

print("Access Token:", access_token)

# 2. Use access token to call APIs
route_response = requests.get(
    f"{BASE_URL}/route",
    headers={
        "Authorization": f"Bearer {access_token}"
    },
    params={
        "origin": "9.0222,38.7469",
        "destination": "9.0500,38.7500"
    }
)

print(route_response.json())

# 3. Refresh token usage (when access token expires)
refresh_response = requests.post(
    f"{BASE_URL}/external/refresh",
    json={
        "refresh_token": refresh_token
    }
)

new_access_token = refresh_response.json()["data"]["accessToken"]
print("New Access Token:", new_access_token)
`}
                    />
                </section>
            </main>
        </div>
    );
}
