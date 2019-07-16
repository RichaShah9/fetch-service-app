import Service from './service';

class RestAPI {
    constructor() {
        this.service = new Service(); 
        this.state = {
            baseURL: '/axelor-erp/ws/rest/',
        }
    }

    login(username, password) {
        const data = {
            username, 
            password
        };
        const url = '/axelor-erp/login.jsp';
        return this.service.post(url, data);        
    }

    search(entity, { limit = 40, offset = 10 }) {
        const data = {
            limit,
            offset,
        };
        const url = `${this.state.baseURL}${entity}/search`;
        return this.service.post(url, data);
    }

    add(entity, record) {
        const data = {
            data: record,
        }
        const url = `${this.state.baseURL}${entity}`;
        return this.service.put(url, data);
    }

    delete(entity, id) {
        const url = `${this.state.baseURL}${entity}/${id}`;
        return this.service.delete(url);
    }

    update(entity,record,id) {
        const data = {
            data: record,
        }
        const url = `${this.state.baseURL}${entity}/${id}`;
        return this.service.post(url, data);
    }

    fetch(entity, id) {
        const url = `${this.state.baseURL}${entity}/${id}/fetch`;
        return this.service.post(url, {});
    }
}

export default RestAPI;