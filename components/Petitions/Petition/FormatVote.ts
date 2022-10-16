const VoteFormat = new Intl.NumberFormat(undefined, {
  maximumSignificantDigits: 3
})

export function FormatVote(number: number) {
  return VoteFormat.format(number)
}