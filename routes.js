import { Router } from "express";
import { createRequest, DeleteRequest, readAllRequest, readYourRequest, readYourRequestList, updateRequest } from "./controllers/api/customer.js";
import { createService, deleteService, read, readAllServices, readYourServiceList, updateService } from "./controllers/api/provider.js";
import { locationFilter , priceFilter, SearchBar} from "./controllers/api/serach.js";
import { requestAccept, serviceAccept, acceptedServices_Customers, acceptedrequested_Provider , profile } from "./controllers/api/serviceHandler.js";
import { login, signIn } from "./controllers/auth/auth.js";
const router = Router();

//Authentication routes
router.post('/auth/signIn', signIn);
router.post('/auth/login', login);

//Providers routes
router.post('/provider/create_service',createService);
router.get('/provider/provided_services',readYourServiceList); //done
router.delete('/delete/service',deleteService); 
router.put('/provider/update_service',updateService);
router.get('/provider/requests',readAllRequest); //done

router.put('/provider/request/accept',requestAccept);
router.get('/provider/list/accepted_requests', acceptedrequested_Provider); //done

//Customer routes
router.post('/customer/create_request',createRequest);
router.get('/customer/customer_services',readYourRequestList); //done
router.delete('/delete/request',DeleteRequest); 
router.put('/customer/update_request',updateRequest);
router.get('/customer/services',readAllServices); //done

router.put('/customer/service/accept',serviceAccept); 
router.get('/customer/list/accepted_services', acceptedServices_Customers); //done

//Search and Filter Routes
router.get('/customer/filterByLocation', locationFilter); 
router.get('/customer/filterByprice', priceFilter);
router.get('/customer/search',SearchBar);

//User routes
router.get('/profile', profile); 
router.get('/service/details', read);

export default router