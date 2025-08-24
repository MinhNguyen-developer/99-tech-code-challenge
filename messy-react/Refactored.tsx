interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain;
}

type Blockchain = "Osmosis" | "Ethereum" | "Arbitrum" | "Zilliqa" | "Neo";

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number;
}

interface Props extends BoxProps {}

const priorityMap: Record<Blockchain, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: Blockchain): number =>
  priorityMap[blockchain] ?? -99;

const WalletPage: React.FC<Props> = ({ children, ...rest }) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const processedBalances = useMemo<FormattedWalletBalance[]>(() => {
    return balances
      .filter((b) => getPriority(b.blockchain) > -99 && b.amount > 0)
      .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain))
      .map((b) => ({
        ...b,
        formatted: b.amount.toFixed(2),
        usdValue: (prices[b.currency] ?? 0) * b.amount,
      }));
  }, [balances, prices]);

  return (
    <div {...rest}>
      {processedBalances.map((balance) => (
        <WalletRow
          className={classes.row}
          key={`${balance.currency}-${balance.blockchain}`}
          amount={balance.amount}
          usdValue={balance.usdValue}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
