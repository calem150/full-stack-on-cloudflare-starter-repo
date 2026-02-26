export async function getLastHourClicks(
  accountId: string
): Promise<number> {
  return 0
}

export async function getLast24Hours(
  accountId: string
): Promise<{ last24Hours: number; percentChange: number }> {
  return {
    last24Hours: 0,
    percentChange: 0,
  }
}

export async function getLast30Days(
  accountId: string
): Promise<number> {
  return 0
}