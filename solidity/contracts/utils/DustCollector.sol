// SPDX-License-Identifier: MIT

pragma solidity >=0.8.9 <0.9.0;

import './Governable.sol';
import '../../interfaces/utils/IDustCollector.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

abstract contract DustCollector is IDustCollector, Governable {
  using SafeERC20 for IERC20;

  /// @inheritdoc IDustCollector
  address public constant ETH_ADDRESS = 0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

  // methods

  /// @inheritdoc IDustCollector
  function sendDust(
    address _token,
    uint256 _amount,
    address _to
  ) external onlyGovernor {
    if (_to == address(0)) revert ZeroAddress();
    if (_token == ETH_ADDRESS) {
      payable(_to).transfer(_amount);
    } else {
      IERC20(_token).safeTransfer(_to, _amount);
    }
    emit DustSent(_token, _amount, _to);
  }
}
