 function getReward(address _account, bool _claimExtras) public updateReward(_account) returns(bool){
        uint256 reward = earned(_account);
        if (reward > 0) {
            rewards[_account] = 0;
            rewardToken.safeTransfer(_account, reward);
            IDeposit(operator).rewardClaimed(pid, _account, reward);
            emit RewardPaid(_account, reward);
        }

        //also get rewards from linked rewards
        if(_claimExtras){
            for(uint i=0; i < extraRewards.length; i++){
                IRewards(extraRewards[i]).getReward(_account);
            }
        }
        return true;
    }



    function rewardClaimed(uint256 _pid, address _address, uint256 _amount) external returns(bool){
        address rewardContract = poolInfo[_pid].crvRewards;
        require(msg.sender == rewardContract || msg.sender == lockRewards, "!auth");

        //mint reward tokens
        ITokenMinter(minter).mint(_address,_amount);
        
        return true;
    }


    if (crv_earned>0){

    }



     function mint(address _to, uint256 _amount) external {
        if(msg.sender != operator){
            //dont error just return. if a shutdown happens, rewards on old system
            //can still be claimed, just wont mint cvx
            return;
        }

        uint256 supply = totalSupply();
        if(supply == 0){
            //premine, one time only
            _mint(_to,_amount);
            //automatically switch operators
            updateOperator();
            return;
        }
        
        //use current supply to gauge cliff
        //this will cause a bit of overflow into the next cliff range
        //but should be within reasonable levels.
        //requires a max supply check though
        uint256 cliff = supply.div(reductionPerCliff);
        //mint if below total cliffs
        if(cliff < totalCliffs){
            //for reduction% take inverse of current cliff
            uint256 reduction = totalCliffs.sub(cliff);
            //reduce
            _amount = _amount.mul(reduction).div(totalCliffs);

            //supply cap check
            uint256 amtTillMax = maxSupply.sub(supply);
            if(_amount > amtTillMax){
                _amount = amtTillMax;
            }

            //mint
            _mint(_to, _amount);
        }
    }