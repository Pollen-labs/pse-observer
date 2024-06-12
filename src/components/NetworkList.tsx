'use client'
import { OnchainMetricsData } from "@/types";
import { useState } from "react";

interface NetworkListProps {
  onchainMetrics: OnchainMetricsData[];
}

export const NetworkMetrics: React.FC<OnchainMetricsData> = ({
  active_contract_count_90_days,
  address_count,
  address_count_90_days,
  days_since_first_transaction,
  // display_name,
  event_source,
  gas_fees_sum,
  gas_fees_sum_6_months,
  high_activity_address_count_90_days,
  low_activity_address_count_90_days,
  medium_activity_address_count_90_days,
  multi_project_address_count_90_days,
  new_address_count_90_days,
  // project_id,
  // project_name,
  // project_namespace,
  // project_source,
  returning_address_count_90_days,
  transaction_count,
  transaction_count_6_months,
 }) => {
  return (
    <div>
      <li>Event source: {event_source}</li>
      <li>Number of contracts: {active_contract_count_90_days}</li>
      <li>Addresses:</li>
        <p className="pl-5">- total: {address_count}</p>
        <p className="pl-5">- total last 90 days: {address_count_90_days}</p>
        <p className="pl-5">- new (90 days): {new_address_count_90_days}</p>
        <p className="pl-5">- returning (90 days): {returning_address_count_90_days}</p>
        <p className="pl-5">- low activity (90 days): {low_activity_address_count_90_days}</p>
        <p className="pl-5">- medium activity (90 days): {medium_activity_address_count_90_days}</p>
        <p className="pl-5">- high activity (90 days): {high_activity_address_count_90_days}</p>
        <p className="pl-5">- multi-project (90 days): {multi_project_address_count_90_days}</p>
      <li>Transactions:</li>
        <p className="pl-5">- days since first txn: {days_since_first_transaction}</p>
        <p className="pl-5">- total txns: {transaction_count}</p>
        <p className="pl-5">- txns in last 6 months: {transaction_count_6_months}</p>
        <p className="pl-5">- total gas fees: {gas_fees_sum}</p>
        <p className="pl-5">- gas fees in last 6 months: {gas_fees_sum_6_months}</p>
    </div>
  )
}

export const NetworkList: React.FC<NetworkListProps> = ({ onchainMetrics }) => {
  const networks = onchainMetrics.map((project: OnchainMetricsData) => project.event_source)
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0])
  const networkMetrics = onchainMetrics.filter((metrics: OnchainMetricsData) => metrics.event_source === selectedNetwork)[0]

  return (
    <section>
      <div className="flex gap-5 pb-4">
        {networks.map((network: string) => 
          <div 
            key={network}
            className={`cursor-pointer ${network === selectedNetwork ? 'underline font-semibold': ''}`}
            onClick={() => setSelectedNetwork(network)}
          >
            {network}
          </div>
        )}
      </div>
      <NetworkMetrics {...networkMetrics} />
    </section>
  )
}

export default NetworkList;