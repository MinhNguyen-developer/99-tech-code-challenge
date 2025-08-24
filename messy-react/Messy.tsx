interface WalletBalance {
  currency: string;
  amount: number;
  // ❌ Missing `blockchain` property, but later code calls balance.blockchain
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

interface Props extends BoxProps {}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: any): number => {
    // ❌ Uses `any` type → loses type safety.
    // ✅ Should be a union type (e.g. "Osmosis" | "Ethereum" | ...).
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // ❌ Typo: using `lhsPriority` instead of `balancePriority`.
        // ❌ Logic keeps balances with `amount <= 0`, likely unintended.
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // ❌ Sorting comparator could be simplified.
        // ✅ Use `return getPriority(rhs.blockchain) - getPriority(lhs.blockchain)`
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  }, [balances, prices]);
  // ❌ `prices` is an unnecessary dependency — only balances affect sorting.

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
      // ❌ `toFixed()` default is 0 decimals → might lose precision.
      // ❌ This array is never used later (dead code).
    };
  });

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      // ❌ Type mismatch: sortedBalances is WalletBalance[], not FormattedWalletBalance[].
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          // ❌ key={index} is an anti-pattern; should use a stable identifier.
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
          // ❌ `balance.formatted` doesn’t exist on WalletBalance, only on FormattedWalletBalance.
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
