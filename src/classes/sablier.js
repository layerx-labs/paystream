"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sablier = void 0;
const model_1 = require("@base/model");
const Sablier_json_1 = __importDefault(require("@abi/Sablier.json"));
class Sablier extends model_1.Model {
    constructor(web3Connection, contractAddress) {
        super(web3Connection, Sablier_json_1.default.abi, contractAddress);
    }
    async balanceOf(streamId, who) {
        return this.callTx(this.contract.methods.balanceOf(streamId, who));
    }
    async cancelStream(streamId) {
        return this.sendTx(this.contract.methods.cancelStream(streamId));
    }
    async createStream(recipient, deposit, tokenAddress, startTime, stopTime) {
        return this.sendTx(this.contract.methods.createStream(recipient, deposit, tokenAddress, startTime, stopTime));
    }
    async deltaOf(streamId) {
        return this.callTx(this.contract.methods.deltaOf(streamId));
    }
    async getStream(streamId) {
        return this.callTx(this.contract.methods.getStream(streamId));
    }
    async nextStreamId() {
        return this.callTx(this.contract.methods.nextStreamId());
    }
    async withdrawFromStream(streamId, amount) {
        return this.sendTx(this.contract.methods.withdrawFromStream(streamId, amount));
    }
    async getCancelStreamEvents(filter) {
        return this.contract.self.getPastEvents(CancelStream, filter);
    }
    async getCreateStreamEvents(filter) {
        return this.contract.self.getPastEvents(CreateStream, filter);
    }
    async getWithdrawFromStreamEvents(filter) {
        return this.contract.self.getPastEvents(WithdrawFromStream, filter);
    }
}
exports.Sablier = Sablier;
