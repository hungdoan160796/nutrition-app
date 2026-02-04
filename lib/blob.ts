

export async function getJSON<T>(key: string): Promise<T> {
  const blobs = await list({ prefix: key });

  if (!blobs.blobs.length) {
    throw new Error(`Blob not found: ${key}`);
  }

  const res = await fetch(blobs.blobs[0].url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch blob: ${key}`);
  }

  return res.json() as Promise<T>;
}
