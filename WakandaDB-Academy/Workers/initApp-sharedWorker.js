var    generator,    COUNT_EMPLOYEES_TO_CREATE;COUNT_EMPLOYEES_TO_CREATE = 20000;// if data empty, generate fake dataif (ds.Employee.length === 0) {	generator = require("fakedata/generator");	loginByPassword('admin', 'admin');	console.info(" ::::: Creating ", COUNT_EMPLOYEES_TO_CREATE, " Employees  Companies...");	generator.buildFakeData(COUNT_EMPLOYEES_TO_CREATE, {log:false});	console.info(" End creating Employees. Employees: ", ds.Employee.length, ", Companies: ", ds.Company.length, ", Country: ", ds.Country.length, " ::::: ");	ds.flushCache();}// Warm the cache with a sequential query that will load all logsconsole.log('Warming the cache..........');try {	ds.Employee.query("ID > 0");	ds.Company.query("ID > 0");	ds.Country.query("ID > 0");} catch(err) {	// just ignore this error	console.warn('query failed:', err);}console.log('Warming the cache..........done');self.close();