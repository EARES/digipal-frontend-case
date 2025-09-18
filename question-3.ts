// The main idea is: We have users who are making changes on screens and we want to track and log these changes so that we can see each other’s updates in real time.
// To do that; i'll write a general service for every action which getting key and value and set to supabase service. 
// Supabase service will getting params and add some additional params like user informations, timestap e.g.
// We can use supabase channel feature for that becuase it's support realtime processes. With that every users changes can be trackable and see detail of actions they made.
// Maybe for future, if users and user actions increase and hard to control it, it may be necessary to write something more generic with socket services or 3rd party package.
