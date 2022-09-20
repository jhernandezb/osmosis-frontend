import { Duration } from "dayjs/plugin/duration";
import { AppCurrency, FiatCurrency } from "@keplr-wallet/types";
import { PricePretty, RatePretty, CoinPretty } from "@keplr-wallet/unit";
import { IPriceStore } from "../../price";
import { ObservableQueryGammPoolShare } from "../pool-share";
import { ObservableQueryIncentivizedPools, ObservableQueryLockableDurations } from "../pool-incentives";
import { ObservableQueryGuage } from "../incentives";
import { ObservableQueryAccountLocked, ObservableQueryAccountLockedCoins, ObservableQueryAccountUnlockingCoins } from "../lockup";
import { ObservableQueryPool } from "./pool";
/** Convenience store for getting common details of a pool via many other query stores. */
export declare class ObservableQueryPoolDetails {
    protected readonly bech32Address: string;
    protected readonly fiatCurrency: FiatCurrency;
    protected readonly queryPool: ObservableQueryPool;
    protected readonly queries: {
        queryGammPoolShare: ObservableQueryGammPoolShare;
        queryIncentivizedPools: ObservableQueryIncentivizedPools;
        queryAccountLocked: ObservableQueryAccountLocked;
        queryLockedCoins: ObservableQueryAccountLockedCoins;
        queryUnlockingCoins: ObservableQueryAccountUnlockingCoins;
        queryGauge: ObservableQueryGuage;
        queryLockableDurations: ObservableQueryLockableDurations;
    };
    protected readonly priceStore: IPriceStore;
    constructor(bech32Address: string, fiatCurrency: FiatCurrency, queryPool: ObservableQueryPool, queries: {
        queryGammPoolShare: ObservableQueryGammPoolShare;
        queryIncentivizedPools: ObservableQueryIncentivizedPools;
        queryAccountLocked: ObservableQueryAccountLocked;
        queryLockedCoins: ObservableQueryAccountLockedCoins;
        queryUnlockingCoins: ObservableQueryAccountUnlockingCoins;
        queryGauge: ObservableQueryGuage;
        queryLockableDurations: ObservableQueryLockableDurations;
    }, priceStore: IPriceStore);
    get pool(): ObservableQueryPool;
    get poolShareCurrency(): import("@keplr-wallet/types").Currency;
    get isIncentivized(): boolean;
    get totalValueLocked(): PricePretty;
    get lockableDurations(): Duration[];
    get longestDuration(): Duration;
    get gauges(): {
        id: string;
        duration: Duration;
        apr: RatePretty;
        isLoading: boolean;
    }[];
    get userLockedValue(): PricePretty;
    get userBondedValue(): PricePretty;
    get userAvailableValue(): PricePretty;
    get userPoolAssets(): {
        ratio: RatePretty;
        asset: CoinPretty;
    }[];
    get userLockedAssets(): {
        apr: RatePretty | undefined;
        duration: Duration;
        amount: CoinPretty;
        lockIds: string[];
    }[];
    get userUnlockingAssets(): {
        duration: Duration;
        amount: CoinPretty;
        lockIds: string[];
        endTime: Date;
    }[];
    get userCanDepool(): boolean;
    queryExternalGauges: (allowedGauges: {
        gaugeId: string;
        denom: string;
    }[], findCurrency: (denom: string) => AppCurrency | undefined) => {
        duration: string;
        rewardAmount: CoinPretty | undefined;
        remainingEpochs: number;
    }[];
}
