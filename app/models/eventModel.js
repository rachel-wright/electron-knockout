

function EventModel(event){
    var self = this;

    self.eventId = event.eventId
    self.eventSourceType = event.eventSourceType
    self.eventSource = event.eventSource
    self.assetId = ko.observable(event.assetId)
    self.visibilityId = ko.observable(event.visibilityId)
    self.eventOwnerId = ko.observable(event.eventOwnerId)
    self.eventLocation = ko.observable(event.eventLocation)
    self.eventStartDateTime = ko.observable(event.eventStartDateTime)
    self.eventEndDateTime = ko.observable(event.eventEndDateTime)
    self.eventCompleted = ko.observable(event.eventCompleted)
    self.eventComments = ko.observable(event.eventComments)
    self.lastUpdated = ko.observable(event.lastUpdated)

}

module.exports = EventModel