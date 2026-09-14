import type { Term } from '@/types/dictionary';

export const cryptoTerms: Term[] = [
  {
    slug: 'spot-market',
    term: 'Spot Market',
    category: 'crypto',
    aliases: ['spot', 'spot trading'],
    short: 'A market where assets are bought and sold for immediate delivery and full ownership.',
    explanation: [
      'Spot trading means you buy the actual asset with your own capital and hold it. There is no borrowing, no financing and no expiry.',
      'Because there is no leverage, there is no liquidation. The worst case is that the asset goes to zero, and you cannot lose more than you put in.',
      'This is the simplest form of exposure, and it is the appropriate default for anyone who has not yet demonstrated consistent risk control.',
    ],
    example: {
      setup: '$2,000 of bitcoin bought outright at $60,000',
      steps: [
        { label: 'Capital committed', value: '$2,000' },
        { label: 'Bitcoin held', value: '0.0333 BTC' },
        { label: 'Liquidation price', value: 'none' },
        { label: 'Worst possible outcome', value: '−$2,000' },
      ],
      body: [
        'There is no liquidation price on this position, and there is no way to lose more than the $2,000. Bitcoin could fall 70% overnight and the coins would still be there in the morning, worth $600. Nothing forces the position closed.',
        'That is a genuine and underrated advantage, and it is also where the thinking usually stops. A 70% fall is still a 70% fall. Spot protects you from being removed from the trade; it does not protect you from the trade being wrong, and bitcoin has drawn down more than 70% from a high more than once.',
        'So the sizing question does not disappear, it changes shape. Instead of "where do I get liquidated", it becomes "how much of this can I watch fall by three quarters without selling at the bottom". For most people that number is smaller than the one they first type in.',
      ],
    },
    whyItMatters:
      'Spot removes the two ways derivatives traders most often fail — forced liquidation and financing costs — leaving only the price risk you chose.',
    mistakes: [
      'Assuming spot means safe. A 60% drawdown is entirely possible without any leverage.',
      'Sizing a spot position with no stop simply because liquidation is impossible.',
    ],
    related: ['perpetual-futures', 'liquidation-price', 'position-size', 'gas-fee', 'cold-storage'],
  },
  {
    slug: 'perpetual-futures',
    term: 'Perpetual Futures',
    category: 'crypto',
    aliases: ['perps', 'perpetual swap', 'perp'],
    short: 'A leveraged derivative contract that tracks an asset’s price with no expiration date.',
    explanation: [
      'Perpetuals behave like futures but never settle. They stay tethered to the spot price through a periodic funding payment between longs and shorts.',
      'They offer high leverage — often up to 100x — which is the core reason they dominate crypto trading volume and the core reason accounts are destroyed on them.',
      'Because there is no expiry, a position can be held indefinitely, accruing funding costs the whole time.',
    ],
    example: {
      setup: '$500 of margin at 20x on a bitcoin perpetual',
      steps: [
        { label: 'Margin posted', value: '$500' },
        { label: 'Position controlled', value: '$10,000' },
        { label: 'Move that wipes the margin', value: '5%' },
        { label: 'Typical daily range in BTC', value: '2–4%' },
      ],
      body: [
        'Twenty times leverage means a 5% adverse move consumes the entire $500, because 5% of $10,000 is $500. The exchange does not wait for that number exactly — maintenance margin and fees mean the position closes slightly earlier.',
        'Put that next to how bitcoin actually behaves and the problem is obvious. A 2–4% daily range is ordinary. The position is not exposed to a crash; it is exposed to a Tuesday.',
        'The leverage slider is the part that misleads. It reads like a setting for how aggressive you want to be, when what it actually sets is how close the exit is to the entry. Choosing 20x is choosing a 5% stop — one that the exchange places, that ignores your chart, and that closes the position for good rather than letting it come back.',
      ],
    },
    whyItMatters:
      'Perpetuals make it trivially easy to open a position far larger than your account. The position size math matters more here than in any other instrument.',
    mistakes: [
      'Choosing leverage first and discovering the liquidation price afterward.',
      'Holding a perpetual for weeks without accounting for accumulated funding.',
      'Treating maximum available leverage as a recommendation.',
    ],
    related: ['funding-rate', 'liquidation-price', 'leverage', 'margin', 'spot-market'],
    popular: true,
  },
  {
    slug: 'funding-rate',
    term: 'Funding Rate',
    category: 'crypto',
    aliases: ['funding', 'funding payment'],
    short: 'A recurring payment between long and short holders that keeps a perpetual near spot price.',
    explanation: [
      'When a perpetual trades above spot, funding is positive and longs pay shorts. When it trades below, shorts pay longs. Payments typically occur every eight hours.',
      'The mechanism creates an economic incentive to take the less crowded side, which pulls the contract price back toward spot.',
      'Extreme funding is a positioning signal. Very high positive funding means the long side is crowded and leveraged, which is often where sharp liquidation cascades begin.',
    ],
    example: {
      setup: 'A long perpetual held two weeks while funding runs at 0.03% every eight hours',
      steps: [
        { label: 'Payments per day', value: '3' },
        { label: 'Payments over 14 days', value: '42' },
        { label: 'Total cost of position value', value: '1.26%' },
        { label: 'Same cost at 10x leverage', value: '12.6% of margin' },
      ],
      body: [
        'Funding is quoted against the position, not against the margin, and that is where the number hides. At 10x leverage the position is ten times the margin, so a 1.26% charge on the position is a 12.6% charge on the money that is actually yours.',
        'Two weeks in, before price has done anything at all, an eighth of the account behind the trade has been paid to the other side. The chart shows a position at breakeven. The balance does not.',
        'The rate also tells you something. Funding runs positive because the long side is crowded and paying to stay there. Reading that as confirmation — "everyone is bullish" — has it backwards: it is a measure of how many leveraged holders are waiting to be liquidated in the same direction.',
      ],
    },
    whyItMatters:
      'Funding is a real, recurring cost that compounds on held positions. At high rates it can exceed the move you were trading for.',
    mistakes: [
      'Ignoring funding on positions held across many payment intervals.',
      'Reading extreme funding as confirmation rather than as crowding.',
    ],
    related: ['perpetual-futures', 'liquidation-price', 'leverage', 'carry-trade', 'spot-market'],
  },
  {
    slug: 'liquidation-price',
    term: 'Liquidation Price',
    category: 'crypto',
    aliases: ['liquidation', 'liquidated', 'liq price'],
    short: 'The price at which a leveraged position is forcibly closed because margin is exhausted.',
    explanation: [
      'When losses consume your posted margin, the exchange closes the position automatically. You do not get a choice, and you typically lose the entire margin.',
      'Higher leverage moves the liquidation price closer to your entry. At 50x, roughly a 2% adverse move is enough.',
      'Liquidations cluster at obvious levels and trigger cascades: forced selling pushes price lower, which triggers more liquidations.',
    ],
    formula: {
      label: 'Approximate distance to liquidation',
      expression: '100 ÷ Leverage  (percent move against you)',
      legend: [
        { symbol: 'Leverage', meaning: 'Position value ÷ margin posted' },
        { symbol: 'Note', meaning: 'Maintenance margin and fees make the real distance slightly smaller' },
      ],
    },
    widget: 'leverage',
    diagram: 'leverage',
    example: {
      setup: '$1,000 of margin at 25x, long bitcoin from $60,000',
      steps: [
        { label: 'Position value', value: '$25,000' },
        { label: 'Distance to liquidation', value: '100 ÷ 25 = 4%' },
        { label: 'Liquidation price', value: '≈ $57,600' },
        { label: 'A stop at $57,000 would', value: 'never trigger' },
      ],
      body: [
        'The last line is the one worth sitting with. A trader who decided on a $57,000 stop — a considered level, below a swing low — has placed an order that can never fill, because the exchange closes the position at $57,600 first and the stop dies with it.',
        'The stop was not too wide for the chart. It was too wide for the leverage, and the leverage was chosen before anyone looked at where the stop belonged. That is the wrong order, and it hands your exit to a margin engine that has never seen your analysis.',
        'Run it the other way and the number falls out on its own. If the stop belongs at $57,000, that is a 5% move, so the leverage has to be low enough that liquidation sits beyond it — well under 20x, with room left for the fees and maintenance margin that make the real distance a little shorter than 100 ÷ leverage suggests.',
      ],
    },
    whyItMatters:
      'Your stop loss should always trigger well before liquidation. If the liquidation price is closer than your stop, the exchange is managing your risk instead of you.',
    mistakes: [
      'Setting a stop beyond the liquidation price, which makes the stop meaningless.',
      'Using maximum leverage and leaving no room for normal volatility.',
      'Assuming liquidation returns some capital. Usually it does not.',
    ],
    related: ['leverage', 'perpetual-futures', 'margin', 'margin-call', 'stop-loss'],
    popular: true,
  },
  {
    slug: 'stablecoin',
    term: 'Stablecoin',
    category: 'crypto',
    aliases: ['usdt', 'usdc', 'pegged'],
    short: 'A crypto asset designed to hold a fixed value, usually one US dollar.',
    explanation: [
      'Stablecoins are the settlement layer of crypto trading. Most pairs are quoted against them, and they function as the cash position between trades.',
      'Backing models vary. Some hold cash and short-term treasuries; others rely on crypto collateral or algorithms. The backing determines how the peg behaves under stress.',
      'Pegs are maintained, not guaranteed. A stablecoin trading at $0.97 during a panic is a real and recurring event.',
    ],
    example: {
      setup: 'USDC and the Silicon Valley Bank weekend, March 2023',
      body: [
        'Circle, which issues USDC, held part of its reserves in cash deposits at Silicon Valley Bank. When the bank failed on 10 March 2023 and it became unclear whether those deposits would be recovered, USDC broke its peg — trading as low as roughly $0.87 over that weekend.',
        'For anyone sitting in USDC between trades, that was not a market risk they had taken a view on. It was a 13% loss on the part of the account they considered cash, arriving on a Saturday, in an instrument whose entire purpose was to not do that. The peg was restored the following week once US regulators guaranteed the deposits.',
        'The lesson is not that USDC is unsound — it recovered, and holders who did nothing were made whole. It is that a stablecoin is a claim on an issuer, and the backing behind the claim decides how it behaves on the worst weekend rather than on an ordinary Tuesday. That is worth knowing before the account is parked in one.',
      ],
    },
    whyItMatters:
      'If your account is denominated in a stablecoin, a depeg is a direct loss on your entire balance, including capital you thought was sitting safely in cash.',
    mistakes: [
      'Treating all stablecoins as equally safe regardless of backing.',
      'Holding an entire account in one stablecoin without considering depeg risk.',
    ],
    related: ['spot-market', 'liquidity', 'volatility', 'altcoin', 'perpetual-futures'],
  },
  {
    slug: 'altcoin',
    term: 'Altcoin',
    category: 'crypto',
    aliases: ['alts', 'alt'],
    short: 'Any cryptocurrency other than bitcoin.',
    explanation: [
      'Altcoins range from large, established networks to tokens with almost no liquidity. The category spans an enormous range of risk.',
      'Most altcoins are highly correlated with bitcoin, and typically with higher beta: they fall further in declines and rise further in rallies.',
      'Liquidity varies drastically and can vanish during stress, producing spreads and slippage that make stop orders unreliable.',
    ],
    example: {
      setup: 'Five different altcoins, 2% of the account in each',
      steps: [
        { label: 'Positions', value: '5' },
        { label: 'Account committed', value: '10%' },
        { label: 'Risk as it feels', value: 'spread across 5 bets' },
        { label: 'Risk as it behaves', value: 'one bet, higher beta' },
      ],
      body: [
        'Five tickers, five charts, five stories about five different networks. It reads like a portfolio. Then bitcoin falls 10% on a Sunday and all five are down 15 to 20% by Monday morning, together, because the thing they mostly have in common is that they are not bitcoin.',
        'Most altcoins trade as a leveraged expression of the same underlying move. They fall further in declines and rise further in rallies, which means the basket did not reduce the size of the bet — it increased it, while making it feel smaller.',
        'The second problem arrives at the exit. Thin books are thin for everyone at once, so the stop that assumed a normal spread fills several percent worse than it showed, on all five, in the same hour. Diversification that fails exactly when it is needed was never diversification.',
      ],
    },
    whyItMatters:
      'Holding several altcoins is usually one concentrated bet rather than a diversified portfolio, because they tend to move together.',
    mistakes: [
      'Treating a basket of altcoins as diversification.',
      'Applying bitcoin-sized stops to assets that routinely move several times as far.',
      'Ignoring how thin the order book becomes outside peak hours.',
    ],
    related: ['correlation-risk', 'liquidity', 'volatility', 'spot-market', 'halving'],
  },
  {
    slug: 'halving',
    term: 'Halving',
    category: 'crypto',
    aliases: ['bitcoin halving', 'halvening'],
    short: 'A scheduled reduction in the rate at which new coins are created.',
    explanation: [
      'Bitcoin’s halving occurs roughly every four years, cutting the block reward in half and slowing the growth of supply.',
      'It is fully known in advance, which is exactly why its price impact is debated. Markets generally price in scheduled events ahead of time.',
      'The event itself is often quiet. The volatility tends to arrive in the anticipation and the aftermath rather than on the day.',
    ],
    example: {
      setup: 'The April 2024 halving, known about for four years',
      steps: [
        { label: 'Block reward before', value: '6.25 BTC' },
        { label: 'Block reward after', value: '3.125 BTC' },
        { label: 'Date known in advance', value: 'since 2020' },
        { label: 'Participants unaware', value: 'none' },
      ],
      body: [
        'Bitcoin’s issuance schedule is written into the software. The April 2024 halving cut the block reward from 6.25 to 3.125 BTC, on a date every participant could calculate years ahead, from a supply change nobody had to discover.',
        'That is precisely what makes it a poor thing to trade. A market prices what it knows, and it had four years to know this. Whatever the halving is worth was being paid for long before the day arrived — which is why the day itself is usually uneventful while the months either side are not.',
        'The deeper trap is the sample size. There have been four halvings. Four observations of anything, each in a completely different market with different participants and different rates, is a story rather than evidence. Sizing up on a pattern with n = 4 is not a strategy, and the history of markets is largely the history of people discovering that.',
      ],
    },
    whyItMatters:
      'Halvings are a useful reminder that a well-known future event is already reflected in price. Trading a date everyone has on their calendar is rarely an edge.',
    mistakes: [
      'Assuming a scheduled, publicly known event is unpriced.',
      'Sizing up around the date on the basis of historical patterns from a very small sample.',
    ],
    related: ['volatility', 'spot-market', 'recency-bias', 'altcoin', 'bull-market'],
  },
  {
    slug: 'gas-fee',
    term: 'Gas Fee',
    category: 'crypto',
    aliases: ['gas', 'network fee', 'transaction fee'],
    short: 'The cost paid to a blockchain network to process a transaction.',
    explanation: [
      'Gas compensates the network for computation and block space. Fees are set by demand, so they spike when the network is busy.',
      'On decentralized exchanges gas is charged per transaction regardless of trade size, which makes small trades disproportionately expensive.',
      'Fees are paid whether or not a transaction succeeds. A failed swap still costs gas.',
    ],
    example: {
      setup: 'The same $12 of gas on a $40 swap and on a $4,000 swap',
      steps: [
        { label: 'Gas cost', value: '$12 (both)' },
        { label: 'On a $40 swap', value: '30% of the trade' },
        { label: 'On a $4,000 swap', value: '0.3% of the trade' },
        { label: 'Failed transaction', value: 'still costs $12' },
      ],
      body: [
        'Gas does not scale with trade size. It is a flat charge for block space, so the smaller the trade, the larger the share of it that goes to the network. On the $40 swap, price has to move 30% in your favour just to get back to even — and then another 30% to get out again.',
        'That sets a practical floor under on-chain trading that has nothing to do with strategy. Below a certain size the fee is the trade, and no amount of correct analysis rescues it.',
        'The last line is the one people meet the hard way. Gas pays for the attempt, not the result. A swap that reverts because the price moved while it was pending still costs the full fee, and during congestion — which is exactly when swaps revert — that fee is at its highest.',
      ],
    },
    whyItMatters:
      'Gas is a fixed cost per trade rather than a percentage. It sets a practical minimum trade size below which the fee consumes the expected profit.',
    mistakes: [
      'Ignoring gas when calculating whether a small on-chain trade is worth making.',
      'Trading during network congestion without checking current fee levels.',
    ],
    related: ['spread', 'liquidity', 'spot-market', 'altcoin', 'stablecoin'],
  },
  {
    slug: 'cold-storage',
    term: 'Cold Storage',
    category: 'crypto',
    aliases: ['cold wallet', 'hardware wallet', 'self custody'],
    short: 'Holding crypto assets offline, away from exchanges and internet-connected systems.',
    explanation: [
      'Cold storage keeps private keys on a device that is never connected to the internet, which removes an entire class of remote attack.',
      'Assets held on an exchange are, legally and practically, a claim on that exchange rather than something you directly control.',
      'The tradeoff is speed and responsibility. Cold assets cannot be traded instantly, and losing the keys means losing the assets permanently.',
    ],
    example: {
      setup: 'FTX, November 2022 — the risk underneath all the others',
      body: [
        'FTX was the second-largest crypto exchange in the world. On 8 November 2022 it halted customer withdrawals, and on 11 November it filed for bankruptcy. Balances that had shown as available a week earlier became claims in a bankruptcy court, and customers waited years rather than days to see any of it.',
        'No stop loss addressed this. No position size addressed it either. Every risk control a trader applies operates inside the exchange, and this was the exchange itself failing — a risk that sits underneath all the others and is invisible on every chart.',
        'The defence is boring and it is the only one there is: keep on an exchange what you need in order to trade, and hold the rest somewhere the exchange cannot spend. A trader running a $2,000 book does not need a $40,000 balance sitting there for convenience. That convenience is an unhedged bet on a company’s solvency.',
      ],
    },
    whyItMatters:
      'Exchange failure is a risk that has nothing to do with your trading and cannot be hedged by any stop loss. It is managed by not keeping more on an exchange than you need to trade.',
    mistakes: [
      'Keeping an entire portfolio on an exchange for the convenience of trading a fraction of it.',
      'Storing recovery phrases digitally, which reintroduces the risk cold storage was meant to remove.',
    ],
    related: ['spot-market', 'broker', 'risk-management', 'stablecoin', 'altcoin'],
  },
];
