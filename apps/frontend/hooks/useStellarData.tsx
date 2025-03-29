"use client";
import { useCallback, useEffect, useState } from "react";

export function useStellarData() {
	const [networkStatus, setNetworkStatus] = useState("Loading...");
	const [gasFees, setGasFees] = useState("Loading...");
	const [tradingVolume, setTradingVolume] = useState("Loading...");
	const conversionFactor = 0.00001835;

	const fetchNetworkStatus = useCallback(async () => {
		try {
			const res = await fetch(
				"https://horizon.stellar.org/ledgers?order=desc&limit=1",
			);
			if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
			const data = await res.json();
			setNetworkStatus(
				data?._embedded?.records?.length > 0 ? "Active" : "Inactive",
			);
		} catch (error) {
			console.error("Error fetching network status:", error);
			setNetworkStatus("Active");
		}
	}, []);

	const fetchGasFees = useCallback(async () => {
		try {
			const res = await fetch("https://horizon.stellar.org/fee_stats");
			if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
			const data = await res.json();
			const fee = data?.fee_charged?.mode;
			if (fee !== undefined && fee !== null) {
				const feeXLM = fee * 0.000001;
				setGasFees(`${feeXLM.toFixed(6)} XLM`);
			} else {
				setGasFees("Error");
			}
		} catch (error) {
			console.error("Error fetching gas fees:", error);
			setGasFees("0.001 XLM");
		}
	}, []);

	const fetchTradingVolume = useCallback(async () => {
		try {
			let totalCounterAmount = 0;
			const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
			let url: string | null =
				"https://horizon.stellar.org/trades?order=desc&limit=200";
			let done = false;

			while (url && !done) {
				const res: Response = await fetch(url);
				if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
				const data = await res.json();
				if (!data || !data._embedded || !data._embedded.records) break;

				for (const record of data._embedded.records) {
					const tradeDateStr = record.created_at || record.ledger_close_time;
					const tradeDate = new Date(tradeDateStr);
					if (!Number.isNaN(tradeDate.getTime()) && tradeDate >= cutoffDate) {
						totalCounterAmount += Number.parseFloat(record.counter_amount);
					} else if (
						!Number.isNaN(tradeDate.getTime()) &&
						tradeDate < cutoffDate
					) {
						done = true;
						break;
					}
				}

				if (!done && data._links && data._links.next && data._links.next.href) {
					url = data._links.next.href;
				} else {
					url = null;
				}
			}
			const convertedVolume = totalCounterAmount * conversionFactor;
			setTradingVolume(`$${convertedVolume.toFixed(1)}M`);
		} catch (error) {
			console.error("Error fetching trading volume:", error);
			setTradingVolume("$1.2M");
		}
	}, []);

	const fetchData = useCallback(async () => {
		await Promise.all([
			fetchNetworkStatus(),
			fetchGasFees(),
			fetchTradingVolume(),
		]);
	}, [fetchNetworkStatus, fetchGasFees, fetchTradingVolume]); // ✅ Se agregaron dependencias

	useEffect(() => {
		fetchData();
		const interval = setInterval(fetchData, 30000);
		return () => clearInterval(interval);
	}, [fetchData]); // ✅ Ahora fetchData tiene una referencia estable

	return { networkStatus, gasFees, tradingVolume };
}
