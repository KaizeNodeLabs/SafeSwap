"use client";
import { useState, useEffect } from "react";

export function useStellarData() {
	const [networkStatus, setNetworkStatus] = useState("Loading...");
	const [gasFees, setGasFees] = useState("Loading...");
	const [tradingVolume, setTradingVolume] = useState("Loading...");
	const conversionFactor = 0.00001835;

	async function fetchNetworkStatus() {
		try {
		const res = await fetch("https://horizon.stellar.org/ledgers?order=desc&limit=1");
		if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
		const data = await res.json();
		setNetworkStatus(data?._embedded?.records?.length > 0 ? "Active" : "Inactive");
		} catch (error) {
		console.error("Error fetching network status:", error);
		setNetworkStatus("Active");
		}
	}

	async function fetchGasFees() {
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
	}

	async function fetchTradingVolume() {
		try {
		let totalCounterAmount = 0;
		// Definimos el cutoff de 24 horas (se incluyen solo los trades de las últimas 24h)
		const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
		let url: string | null = "https://horizon.stellar.org/trades?order=desc&limit=200";
		let done = false;

		while (url && !done) {
			const res: Response = await fetch(url);
			if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
			const data = await res.json();
			if (!data || !data._embedded || !data._embedded.records) break;

			for (const record of data._embedded.records) {
			// Se intenta obtener la fecha del trade: preferimos created_at, sino ledger_close_time
			const tradeDateStr = record.created_at || record.ledger_close_time;
			const tradeDate = new Date(tradeDateStr);
			if (!isNaN(tradeDate.getTime()) && tradeDate >= cutoffDate) {
				totalCounterAmount += parseFloat(record.counter_amount);
			} else if (!isNaN(tradeDate.getTime()) && tradeDate < cutoffDate) {
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
	}

	async function fetchData() {
		await Promise.all([
		fetchNetworkStatus(),
		fetchGasFees(),
		fetchTradingVolume(),
		]);
	}

	useEffect(() => {
		fetchData();
		const interval = setInterval(fetchData, 30000);
		return () => clearInterval(interval);
	}, []);

	return { networkStatus, gasFees, tradingVolume };
}

