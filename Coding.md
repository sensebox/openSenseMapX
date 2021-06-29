# Code Structure

## Modules

The code is currently structured in 4 Modules:

### Core
- This module contains all the core components and services of the app, e.g.:
    - Side-bar
    - Bottom-bar
    - Nav
    - Impressum
    - About
    - Privacy
    - Filter

### Explore
This module contains all the components and services and services for the map, e.g.:

    - Map Component & Service
    - Box details and charts
    - Compare Boxes
    - Legend

### Profile
This module contains all the components and services for the user profile, e.g:

    - Create new Box
    - Profile
    - User Dashboard
    - Login / Logout
    - AuthServices

### Shared
This module contains all the components and services that are shared among the other modules, e.g.:

    - Form Inputs
    - Loading component
    - Control messages



## Map

### Sources

- boxes (the source cotaining all filtered Boxes)
- cluster-boxes (the source for clustered Layers (also contains filtered boxes))
- cluster-hover (the source for displaying clustered boxes on hover of cluster)

### Layers

- base-layer (the layer to show boxes-source unclustered) (active by default)
- boxes-cluster (the layer to show the clustered boxes)
- boxes-no-cluster (the layer to show the unclustered boxes with cluster option active)

- number-layer (Shows the numbers for base-layer)
- cluster-number-layer  (Shows the numbers for boxes-cluster layer)
- no-cluster-number (Shows the numbers for boxes-no-cluster layer)

- cluster-hover-layer (Shows the clustered boxes when hovering a cluster)

- active-layer (Shows the selected boxes)
- active-layer-text (Shows the name of the selected boxes)
