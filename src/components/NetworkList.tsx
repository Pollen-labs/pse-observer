'use client'
import { OnchainMetrics } from "@/types";
import { useState } from "react";

interface NetworkListProps {
  onchainMetrics: OnchainMetrics[];
}

export const NetworkMetrics: React.FC<OnchainMetrics> = ({
  active_users,
  first_txn_date,
  high_frequency_users,
  l2_gas_6_months,
  less_active_users,
  more_active_users,
  multi_project_users,
  network,
  new_user_count,
  num_contracts,
  total_l2_gas,
  total_txns,
  total_users,
  txns_6_months,
  users_6_months,
 }) => {
  return (
    <div>
      <li>Network:</li>
        <p className="pl-5">- {network}</p>
        <p className="pl-5">- number of contracts: {num_contracts}</p>
      <li>Users:</li>
        <p className="pl-5">- total: {total_users}</p>
        <p className="pl-5">- active: {active_users}</p>
        <p className="pl-5">- new: {new_user_count}</p>
        <p className="pl-5">- last 6 months: {users_6_months}</p>
        <p className="pl-5">- less active: {less_active_users}</p>
        <p className="pl-5">- more active: {more_active_users}</p>
        <p className="pl-5">- high frequency: {high_frequency_users}</p>
        <p className="pl-5">- multi-project: {multi_project_users}</p>
      <li>Transactions:</li>
        <p className="pl-5">- first txn date: {new Date(first_txn_date).toISOString().split('T')[0]}</p>
        <p className="pl-5">- total txns: {total_txns}</p>
        <p className="pl-5">- txns in last 6 months: {txns_6_months}</p>
        <p className="pl-5">- total L2 gas: {total_l2_gas}</p>
        <p className="pl-5">- L2 gas in last 6 months: {l2_gas_6_months}</p>
    </div>
  )
}

export const NetworkList: React.FC<NetworkListProps> = ({ onchainMetrics }) => {
  const networks = onchainMetrics.map((project: OnchainMetrics) => project.network)
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0])
  const networkMetrics = onchainMetrics.filter((metrics: OnchainMetrics) => metrics.network === selectedNetwork)[0]

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