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
    whyItMatters:
      'Exchange failure is a risk that has nothing to do with your trading and cannot be hedged by any stop loss. It is managed by not keeping more on an exchange than you need to trade.',
    mistakes: [
      'Keeping an entire portfolio on an exchange for the convenience of trading a fraction of it.',
      'Storing recovery phrases digitally, which reintroduces the risk cold storage was meant to remove.',
    ],
    related: ['spot-market', 'broker', 'risk-management', 'stablecoin', 'altcoin'],
  },
];
