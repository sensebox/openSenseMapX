declare var process: Process;

interface Process {
    env: Env
}



interface Env {
    MAPBOX_TOKEN: string
    API_URL: string
}

interface GlobalEnvironment{
    process: Process;
}