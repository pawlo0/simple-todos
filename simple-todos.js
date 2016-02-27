Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-task": function(event){
      // Prevent default behavior of browser
      event.preventDefault();

      // Get text from the form
      var text = event.target.text.value;

      // Insert text into the database
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });

      // Clears the form
      event.target.text.value = "";

    }
  });
}
