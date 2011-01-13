So why another meta logger.
Well you can use any logger here, but I am bound to java util logging
and do not want to introduce yet another meta logger as dependency, so I simply
will make the normal jul logger serializable and then proceed as usual

in the end to remove this sun/oracle simply should make the logger serializable
or should provide a serializable proxy and a logger interface


